exports.handler = async function(event, context, callback) {
  return callback(null, {
    body: 'It worked!',
    statusCode: 200,
  });
};
