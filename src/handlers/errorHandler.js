import GrpcError from '../errors/grpcErrorToHttpError'

export default (error, req, res, next) => {
  if (error instanceof GrpcError) {
    let { statusCode, message } = parseCodeError(error.status.code)
    return res.status(statusCode).send({ message })
  }
  return next()
}

const parseCodeError = (code) => {
  const map = new Map();
  map.set(16, { statusCode: 401, message: 'The request does not have valid authentication credentials for the operation' })
  map.set(15, { statusCode: 500, message: 'Unrecoverable data loss or corruption.' })
  map.set(14, { statusCode: 500, message: 'The service is currently unavailable. This is most likely a transient condition, which can be corrected by retrying with a backoff. Note that it is not always safe to retry non-idempotent operations' })
  map.set(13, { statusCode: 500, message: 'Internal errors. This means that some invariants expected by the underlying system have been broken. This error code is reserved for serious errors.'})
  map.set(12, { statusCode: 400, message: 'The operation is not implemented or is not supported/enabled in this service' })
  map.set(11, { statusCode: 400, message: 'The operation was attempted past the valid range. E.g., seeking or reading past end-of-file. Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed if the system state changes' })
  map.set(10, { statusCode: 500, message: 'The operation was aborted, typically due to a concurrency issue such as a sequencer check failure or transaction abort. See the guidelines above for deciding between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE' })
  map.set(9, { statusCode: 429, message: 'The operation was rejected because the system is not in a state required for the operations execution' })
  map.set(8, { statusCode: 500, message: 'Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space.' })
  map.set(7, { statusCode: 403, message: 'The caller does not have permission to execute the specified operation' })
  map.set(6, { statusCode: 400, message: 'The entity that a client attempted to create (e.g., file or directory) already exists.' })
  map.set(5, { statusCode: 404, message: 'Some requested entity (e.g., file or directory) was not found' })
  map.set(4, { statusCode: 500, message: 'The deadline expired before the operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long' })
  map.set(3, { statusCode: 400, message: 'The client specified an invalid argument. Note that this differs from FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are problematic regardless of the state of the system (e.g., a malformed file name)' })
  map.set(2, { statusCode: 500, message: 'Unknown error. For example, this error may be returned when a Status value received from another address space belongs to an error space that is not known in this address space. Also errors raised by APIs that do not return enough error information may be converted to this error' })
  map.set(1, { statusCode: 500, message: 'The operation was cancelled, typically by the caller' })

  return map.get(code)
}
