using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web.Cors;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using DanceSchoolPortalApi.DataAccess;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;

namespace DanceSchoolPortalApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
             //var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*")
             //{
             //   SupportsCredentials = true
             //};
            config.EnableCors();

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterType<SqlDataAccess>().As<ISqlDataAccess>().InstancePerRequest();

            var container = builder.Build();
            var resolver = new AutofacWebApiDependencyResolver(container);

            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }
    }
}
