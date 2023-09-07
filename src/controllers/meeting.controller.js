const Meeting = require('../models/meeting.model');
const { format } = require('date-fns');

async function createMeeting(req, res) {
  try {
    const { name, datetime, endtime } = req.body;
    const existingMeeting = await Meeting.findOne({ datetime });

    if (existingMeeting) {
      return res.status(409).json({ error: 'Meeting with the same datetime already exists' });
    }

    const overlappingMeeting = await Meeting.findOne({
      $or: [
        { $and: [{ datetime: { $lt: endtime } }, { endtime: { $gt: datetime } }] },
        { $and: [{ datetime: { $lt: endtime } }, { endtime: { $gt: datetime } }] },
      ],
    });

    if (overlappingMeeting) {
      return res.status(409).json({ error: 'There is already a meeting in that hour' });
    }
 
    const isAvailable = true;

    const formattedDatetime = format(new Date(datetime), 'yyyy-MM-dd HH:mm');
    const formattedEndtime = format(new Date(endtime), 'yyyy-MM-dd HH:mm');

    const meeting = await Meeting.create({
      name,
      datetime: formattedDatetime,
      endtime: formattedEndtime,
      isAvailable,
    });

    console.log('Meeting created:', meeting);

    res.status(201).json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createMeeting,
};