import dotenv from 'dotenv'
dotenv.config()
import path from 'path'
import GrpcErrorToHttp from '../errors/grpcErrorToHttpError'
import GrpcClient from 'grpc-caller'


const PROTO_PATH = path.resolve(__dirname, '../protos/hello.proto')
const grpcClient = GrpcClient(process.env.GRPC_HOST, PROTO_PATH, 'HelloService')

export default {
    hello: async (body) => {
        try {
            return await grpcClient.sayHello(body)
        } catch (error) {
            throw new GrpcErrorToHttp(error)
        }
    }
}