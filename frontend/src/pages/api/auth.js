const handler = async (req, res) => {
    console.log(req.body);

    res.status(200).json({ name: 'John Doe' });
};

export default handler;
