import path from 'path';

const downloadController = (req, res) => {
  const  { filename }  = req.params;
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, 'uploads/', filename); // Update the path to your files directory

  // Set appropriate headers for the download response
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/octet-stream');

  // Send the file to the client
  res.sendFile(filePath, (err) => {
    if (err) {
      // Handle any errors that occur during file download
      console.error(err);
      res.status(500).json({ error: 'Failed to download the file' });
    }
  });
};

export default downloadController;
