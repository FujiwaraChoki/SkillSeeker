const handler = async (req, res) => {
    // Get query parameter: code
    const { code } = req.query;

    res.status(200).json({ code: code });
};

export default handler;
