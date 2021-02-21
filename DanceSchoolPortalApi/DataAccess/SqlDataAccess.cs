using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace DanceSchoolPortalApi.DataAccess
{
    public class SqlDataAccess : ISqlDataAccess
    {
        public string ConnectionString { get; private set; }

        public string GetConnectionString(string name)
        {
            var connString = ConfigurationManager.ConnectionStrings[name].ConnectionString;
            ConnectionString = connString;

            return connString;
        }

        public List<T> LoadData<T, U>(string storedProcedureOrSql, U parameters, bool isStoredProcedure = true)
        {
            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new Exception("LoadData: ConnString is null or empty!");
            }

            using (IDbConnection conn = new SqlConnection(ConnectionString))
            {
                var selectedCommandType = isStoredProcedure ? CommandType.StoredProcedure : CommandType.Text;
                
                var rows = conn.Query<T>(storedProcedureOrSql, param: parameters, commandType: selectedCommandType)
                 .ToList();

                return rows;
            }
        }        

        public T SaveData<T>(string storedProcedureOrSql, T parameters, bool isStoredProcedure = true)
        {
            if (string.IsNullOrEmpty(ConnectionString))
            {
                throw new Exception("SaveData: ConnString is null or empty!");
            }

            using (IDbConnection conn = new SqlConnection(ConnectionString))
            {
                var selectedCommandType = isStoredProcedure ? CommandType.StoredProcedure : CommandType.Text;

                var newlyCreatedObject = conn.Query<T>(new CommandDefinition(commandText: storedProcedureOrSql, parameters: parameters ,commandType: selectedCommandType))
                    .FirstOrDefault();
                return newlyCreatedObject;
                //conn.Execute(storedProcedureOrSql, parameters, commandType: selectedCommandType);
            }

        }
    }
}