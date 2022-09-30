import nextConnect from 'next-connect'

import imageUpload from '../../../middlewares/multer'
import imageResizeHandler from '../../../middlewares/sharp'
import {
	handleUploadToDb,
	handleNoMatch,
	handleError,
} from '../../../controllers/upload-controllers'

const handler = nextConnect({
	onNoMatch: handleNoMatch,
	onError: handleError,
})

handler.use(imageUpload).post(imageResizeHandler(handleUploadToDb))

export default handler

export const config = {
	api: {
		bodyParser: false, // Disallow body parsing, consume as stream
	},
}
