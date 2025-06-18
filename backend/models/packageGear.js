const mongoose = require('mongoose');

const packageGearSchema = new mongoose.Schema({
  package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
  gear_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Gear', required: true },
  gear_quantity: { type: Number, required: true }
}, {
  comment: 'This package uses this gear with the corresponding quantity'
});

const PackageGear = mongoose.model('PackageGear', packageGearSchema);

module.exports = PackageGear;