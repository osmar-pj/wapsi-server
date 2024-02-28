export const getTruck = async (req, res) => {
    try {
        // const truck = await Truck.findById(req.params.id)
        res.status(200).json(truck)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}