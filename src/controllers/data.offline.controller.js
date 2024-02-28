import Data from "../models/Data";

export const postDataRaspberry = async (req, res) => {
    try {

        const dataRaspberry = req.body;

        // console.log(dataRaspberry)

        const dataWapsi = dataRaspberry.dataWapsi

        const name = dataWapsi.devices.name

        console.log(name)

        // const newData = new Data({
        //     serie: dataRaspberry.serie,
        //     mining: dataRaspberry.mining,
        //     level: dataRaspberry.level,
        //     ubication: dataRaspberry.ubication,
        //     name: dataRaspberry.devices.name,
        //     timestamp: dataRaspberry.timestamp,
        // })

        // await newData.save()

        // console.log('Data saved')

        // return res.status(200).json({ status: true, message: 'Data saved' })

        return res.status(200).json({ status: true, message: 'La DATA HA LLEGADO' })
        
    } catch (error) {
        console.error(error)
    }
}