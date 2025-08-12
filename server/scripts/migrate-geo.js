/*
  Migration: Backfill GeoJSON fields from lat/lng
  - Users: set geo from coordinates
  - Events: set location.geo from location.coordinates
  - Alerts: set location.geo from location.coordinates
*/

const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });

const connectDB = require('../config/database');
const User = require('../models/User');
const Event = require('../models/Event');
const Alert = require('../models/Alert');

async function backfillUsers() {
  const cursor = User.find({ 'coordinates.latitude': { $type: 'number' }, 'coordinates.longitude': { $type: 'number' } }).cursor();
  let updated = 0;
  for await (const doc of cursor) {
    const lat = doc.coordinates?.latitude;
    const lon = doc.coordinates?.longitude;
    const needUpdate = !doc.geo || !Array.isArray(doc.geo.coordinates) || doc.geo.coordinates.length !== 2 || doc.geo.coordinates[0] !== lon || doc.geo.coordinates[1] !== lat;
    if (typeof lat === 'number' && typeof lon === 'number' && needUpdate) {
      await User.updateOne({ _id: doc._id }, { $set: { geo: { type: 'Point', coordinates: [lon, lat] } } });
      updated++;
    }
  }
  return updated;
}

async function backfillEvents() {
  const cursor = Event.find({ 'location.coordinates.latitude': { $type: 'number' }, 'location.coordinates.longitude': { $type: 'number' } }).cursor();
  let updated = 0;
  for await (const doc of cursor) {
    const lat = doc.location?.coordinates?.latitude;
    const lon = doc.location?.coordinates?.longitude;
    const geo = doc.location?.geo;
    const needUpdate = !geo || !Array.isArray(geo.coordinates) || geo.coordinates.length !== 2 || geo.coordinates[0] !== lon || geo.coordinates[1] !== lat;
    if (typeof lat === 'number' && typeof lon === 'number' && needUpdate) {
      await Event.updateOne({ _id: doc._id }, { $set: { 'location.geo': { type: 'Point', coordinates: [lon, lat] } } });
      updated++;
    }
  }
  return updated;
}

async function backfillAlerts() {
  const cursor = Alert.find({ 'location.coordinates.latitude': { $type: 'number' }, 'location.coordinates.longitude': { $type: 'number' } }).cursor();
  let updated = 0;
  for await (const doc of cursor) {
    const lat = doc.location?.coordinates?.latitude;
    const lon = doc.location?.coordinates?.longitude;
    const geo = doc.location?.geo;
    const needUpdate = !geo || !Array.isArray(geo.coordinates) || geo.coordinates.length !== 2 || geo.coordinates[0] !== lon || geo.coordinates[1] !== lat;
    if (typeof lat === 'number' && typeof lon === 'number' && needUpdate) {
      await Alert.updateOne({ _id: doc._id }, { $set: { 'location.geo': { type: 'Point', coordinates: [lon, lat] } } });
      updated++;
    }
  }
  return updated;
}

async function run() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    const [u, e, a] = await Promise.all([
      backfillUsers(),
      backfillEvents(),
      backfillAlerts()
    ]);

    console.log(`Backfilled: users=${u}, events=${e}, alerts=${a}`);

    // Ensure indexes
    await Promise.all([
      User.syncIndexes(),
      Event.syncIndexes(),
      Alert.syncIndexes()
    ]);
    console.log('Indexes synchronized');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();


