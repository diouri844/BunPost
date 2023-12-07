import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';

const authManger = Fastify();
// define my fastify option configuration:
// Configure JWT options
const jwtOptions = {
    secret: 'your-secret-key', // replace with your own secret key
    tokenType: 'Bearer',
  };
// setup my auth manager with jwt token :
authManger.register(
    fastifyJwt, 
    jwtOptions
);

authManger.addHook("preHandler",async (req, reply) => {
    if(req.url.startsWith("api")){
        fastifyJwt.jwt.verify(req);
    }
});
export default authManger;
