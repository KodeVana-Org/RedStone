const Contact = require('../model/contact');

exports.Contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;
    
        // Create a new contact instance
        const newContact = new Contact({
          name,
          email,
          message,
        });
    
        // Save the contact to the database
        await newContact.save();
    
        res.status(201).json({ message: 'Contact saved successfully', newContact});
      } catch (error) {
        res.status(500).json({ message: 'Error saving contact', error: error.message });
      }
    ;
}