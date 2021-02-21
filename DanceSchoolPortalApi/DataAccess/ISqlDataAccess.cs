using System;
using System.Collections.Generic;

namespace DanceSchoolPortalApi.DataAccess
{
    public interface ISqlDataAccess
    {
        string ConnectionString { get; }

        string GetConnectionString(string name);
        List<T> LoadData<T, U>(string storedProcedureOrSql, U parameters, bool isStoredProcedure = true);
        T SaveData<T>(string storedProcedureOrSql, T parameters, bool isStoredProcedure = true);
    }
}