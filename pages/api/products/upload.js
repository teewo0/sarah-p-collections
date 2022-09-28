import nextConnect from 'next-connect'

import multipartParser from '../../../middlewares/multer'
import sharpHandler from '../../../middlewares/sharp'
import {
	handleUploadToDb,
	handleNoMatch,
	handleError,
} from '../../../controllers/upload-controllers'

const handler = nextConnect({
	onNoMatch: handleNoMatch,
	onError: handleError,
})

handler.use(multipartParser).post(sharpHandler(handleUploadToDb))

export default handler

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}
