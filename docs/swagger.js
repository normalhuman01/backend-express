module.exports = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Backend MyMarketLogic", 
            description: "Esta es una prueba de backend.", 
            version: "1.0.0", 
            contact: {
              name: "Brayan Cruces", 
              email: "brayan2259@gmail.com", 
              url: "brayancru.com", 
            },
        },
        securityDefinitions: {
            ApiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'X-API-Key'
            }


        },
  
        servers: [
          {
            url: "https://shark-app-nfufp.ondigitalocean.app/",
          },
        ],
      },
      apis: ["./routes/*.js"]
  };