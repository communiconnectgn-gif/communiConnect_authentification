// Validation géographique simplifiée pour CommuniConnect
const simpleLocationValidation = (req, res, next) => {
  try {
    const { region, prefecture, commune, quartier, latitude, longitude } = req.body;

    // Validation de base
    if (!region || !prefecture || !commune || !quartier) {
      return res.status(400).json({
        success: false,
        message: 'Toutes les informations de localisation sont requises'
      });
    }

    // Validation des coordonnées
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({
        success: false,
        message: 'Les coordonnées GPS sont invalides'
      });
    }

    // Validation que les coordonnées sont en Guinée (approximatif)
    if (latitude < 7.0 || latitude > 12.0 || longitude < -15.0 || longitude > -8.0) {
      return res.status(400).json({
        success: false,
        message: 'Les coordonnées doivent être en Guinée'
      });
    }

    // Validation des régions de Guinée
    const validRegions = [
      'Conakry', 'Boké', 'Kindia', 'Mamou', 'Labé', 
      'Faranah', 'Kankan', 'Kérouané', 'Kissidougou', 
      'Nzérékoré', 'Yomou', 'Lola', 'Macenta', 'Guéckédou'
    ];

    if (!validRegions.includes(region)) {
      return res.status(400).json({
        success: false,
        message: 'Région non reconnue en Guinée'
      });
    }

    // Ajouter les données validées à la requête
    req.validatedLocation = {
      region,
      prefecture,
      commune,
      quartier,
      coordinates: { latitude, longitude }
    };

    next();
  } catch (error) {
    console.error('Erreur validation localisation:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la validation de la localisation'
    });
  }
};

module.exports = simpleLocationValidation;
