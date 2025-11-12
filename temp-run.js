const route=require('./.next/server/app/api/auth/[...nextauth]/route.js');
(async () => {
  try {
    const {routeModule}=route;
    const handler = routeModule.handlers.GET;
    const req = new Request('http://localhost/api/auth/session', {method:'GET'});
    const res = await handler(req, { params: {} });
    console.log('status', res.status);
  } catch (err) {
    console.error(err);
  }
})();
