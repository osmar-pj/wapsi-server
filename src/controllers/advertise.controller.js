import Advertiser from '../models/Advertiser'

export const getAdvertise = async (req, res) => {
    try {
        const lastAdvertise = await Advertiser.find().sort({ _id: -1 }).limit(1)
        res.status(200).json(lastAdvertise)
    } catch (error) {
        console.error(error)
    }
}

export const createAdvertise = async (req, res) => {
    try {
        const { description } = req.body
        const newAdvertiser = new Advertiser({
            description
        })
        await newAdvertiser.save()
        res.status(200).json(newAdvertiser)
    } catch (error) {
        console.error(error)
    }
}