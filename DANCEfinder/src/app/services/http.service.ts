import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly rootURL: string = environment.apiService;

  constructor(private http: HttpClient) { }

  public updateHeaders() {
    this.requestHeaderAuthorization = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
  }

  public requestHeaderAuthorization = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  public requestHeaderContentType = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
  });

  public requestHeaderContentTypeJson = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
  });

  getCourseLevel() {
    return this.http.get(this.rootURL + '/courseLevel/all', { headers: this.requestHeaderContentType });
  }

  getAdministrator() {
    return this.http.get(this.rootURL + '/administrator/all', { headers: this.requestHeaderAuthorization });
  }

  public login(userName: string, password: string): Observable<object> {

    const data: string = `username=${userName}&password=${password}&grant_type=password`;

    let body = new URLSearchParams();
    body.set('username', userName);
    body.set('password', password);
    body.set('grant_type', 'password');

    return this.http.post(this.rootURL + '/token', data);
  }

  public register(body: { Email: string, Password: string, ConfirmPassword: string }): Observable<object> {
    return this.http.post(this.rootURL + 'api/Account/Register', body, { headers: this.requestHeaderContentTypeJson });
  }

  public getSchools(): Observable<object> {
    return this.http.get(this.rootURL + '/school/all', { headers: this.requestHeaderContentType });
  }

  public getDances(): Observable<object> {
    return this.http.get(this.rootURL + '/kindOfDance/all', { headers: this.requestHeaderContentType });
  }

  public getLevelsOfAdvance(): Observable<object> {
    return this.http.get(this.rootURL + '/courseLevel/all', { headers: this.requestHeaderContentType });
  }

  // Account
  public getAccount(email: string): Observable<object> {
    return this.http.get(this.rootURL + '/Account/aspNetUser/' + email, { headers: this.requestHeaderAuthorization });
  }

  public getAccountUserInfo(): Observable<object> {
    return this.http.get(this.rootURL + '/Account/UserInfo', { headers: this.requestHeaderAuthorization });
  }

  public postAccountLogout(): Observable<object> {
    return this.http.get(this.rootURL + '/Account/Logout', { headers: this.requestHeaderAuthorization });
  }

  public getAccountManageInfo(returnUrl: string, generateState?: boolean): Observable<object> {

    const query: any = { returnUrl, generateState }

    return this.http.get(this.rootURL + '/Account/ManageInfo', { headers: this.requestHeaderAuthorization, params: { ...query } });
  }

  public postAccountChangePassword(model: {
    OldPassword: string,
    NewPassword: string,
    ConfirmPassword: string
  }): Observable<object> {
    const body: any = {
      OldPassword: model.OldPassword,
      NewPassword: model.NewPassword,
      ConfirmPassword: model.ConfirmPassword
    }

    return this.http.post(this.rootURL + '/Account/ChangePassword', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postAccountSetPassword(model: { NewPassword: string, ConfirmPassword: string }): Observable<object> {
    const body: any = {
      NewPassword: model.NewPassword,
      ConfirmPassword: model.ConfirmPassword
    }

    return this.http.post(this.rootURL + '/Account/SetPassword', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postAccountAddExternalLogin(model: { ExternalAccessToken: string }): Observable<object> {
    const body: any = {
      ExternalAccessToken: model.ExternalAccessToken,
    }

    return this.http.post(this.rootURL + '/Account/AddExternalLogin', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postAccountRemoveLogin(model: { LoginProvider: string, ProviderKey: string }): Observable<object> {
    const body: any = {
      LoginProvider: model.LoginProvider,
      ProviderKey: model.ProviderKey
    }

    return this.http.post(this.rootURL + '/Account/RemoveLogin', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public getAccountExternalLogin(model: { provider: string, error: string }): Observable<object> {

    const query: any = {
      provider: model.provider,
      error: model.error
    }

    return this.http.get(this.rootURL + '/Account/ExternalLogin', { headers: this.requestHeaderAuthorization, params: { ...query } });
  }

  public getAccountExternalLogins(model: { returnUrl: string, generateState: boolean }): Observable<object> {

    const query: any = {
      returnUrl: model.returnUrl,
      generateState: model.generateState
    }

    return this.http.get(this.rootURL + '/Account/ExternalLogins', { headers: this.requestHeaderAuthorization, params: { ...query } });
  }

  public postAccountRegister(model: { Email: string, Password: string, ConfirmPassword: string }): Observable<object> {

    const body: any = {
      Email: model.Email,
      Password: model.Password,
      ConfirmPassword: model.ConfirmPassword
    }

    return this.http.post(this.rootURL + '/Account/Register', JSON.stringify(body), { headers: this.requestHeaderContentType });
  }

  public postAccountRegisterExternal(model: { Email: string }): Observable<object> {

    const body: any = {
      Email: model.Email,
    }

    return this.http.post(this.rootURL + '/Account/RegisterLogins', JSON.stringify(body), { headers: this.requestHeaderContentType });
  }

  // Administrator
  public getAdministratorById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/administrator/' + id, { headers: this.requestHeaderAuthorization });
  }

  public putAdministratorAdd(model: { PersonId: string }): Observable<object> {

    const body: any = {
      PersonId: model.PersonId,
    }

    return this.http.post(this.rootURL + '/administrator/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  // Client
  public getClientById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/client/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getClientAll(): Observable<object> {
    return this.http.get(this.rootURL + '/client/all', { headers: this.requestHeaderAuthorization });
  }

  public putClientAdd(model: { PersonId: string }): Observable<object> {

    const body: any = {
      PersonId: model.PersonId,
    }

    return this.http.post(this.rootURL + '/client/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  // Client Group
  public getClientGroupByGroupId(groupId: string): Observable<object> {
    return this.http.get(this.rootURL + '/clientGroup/' + groupId, { headers: this.requestHeaderAuthorization });
  }

  public getClientGroupByClientId(clientId: string): Observable<object> {
    return this.http.get(this.rootURL + '/clientGroup/' + clientId, { headers: this.requestHeaderAuthorization });
  }

  public getClientGroupByClientIdAndGroupId(clientId: string, groupId: string): Observable<object> {
    return this.http.get(`${this.rootURL}/clientGroup/${clientId}/${groupId}`, { headers: this.requestHeaderAuthorization });
  }

  public getClientGroupAll(): Observable<object> {
    return this.http.get(this.rootURL + '/clientGroup/all', { headers: this.requestHeaderAuthorization });
  }

  public putClientGroupAdd(model: { StudyGroupId: string, ClientId: string }): Observable<object> {

    const body: any = {
      StudyGroupId: model.StudyGroupId,
      ClientId: model.ClientId,
    }

    return this.http.post(this.rootURL + '/clientGroup/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  // Course
  public getCourseById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/course/' + id, { headers: this.requestHeaderAuthorization });
  }
  public getCourseAll(): Observable<object> {
    return this.http.get(this.rootURL + '/course/all', { headers: this.requestHeaderAuthorization });
  }

  public putCourseAdd(model: {
    Name: string,
    Price: number,
    KindOfDanceId: string,
    SchoolId: string,
    IsActive: boolean
  }): Observable<object> {

    const body: any = {
      Name: model.Name,
      Price: model.Price,
      KindOfDanceId: model.KindOfDanceId,
      SchoolId: model.SchoolId,
      IsActive: model.IsActive
    }

    return this.http.post(this.rootURL + '/course/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postCourseRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/course/remove/' + id, { headers: this.requestHeaderAuthorization });
  }

  // CourseLevel
  public getCourseLevelById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/courseLevel/' + id, { headers: this.requestHeaderAuthorization });
  }
  public getCourseLevelAll(): Observable<object> {
    return this.http.get(this.rootURL + '/courseLevel/all', { headers: this.requestHeaderAuthorization });
  }

  public putCourseLevelAdd(model: {
    CourseId: string,
    LevelId: number,
  }): Observable<object> {

    const body: any = {
      CourseId: model.CourseId,
      LevelId: model.LevelId
    }

    return this.http.post(this.rootURL + '/courseLevel/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postCourseLevelRemove(model: { CourseId: string, LevelId: string }): Observable<object> {
    const body: any = {
      CourseId: model.CourseId,
      LevelId: model.LevelId
    }

    return this.http.post(this.rootURL + '/courseLevel/remove', body, { headers: this.requestHeaderAuthorization });
  }

  //Home
  public getHome(): Observable<object> {
    return this.http.post(this.rootURL + '/', { headers: this.requestHeaderAuthorization });
  }

  // Instructor
  public getInstructorById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/instructor/' + id, { headers: this.requestHeaderAuthorization });
  }
  public getInstructorAll(): Observable<object> {
    return this.http.get(this.rootURL + '/instructor/all', { headers: this.requestHeaderAuthorization });
  }

  public putInstructorAdd(model: { PersonId: string }): Observable<object> {
    const body: any = {
      PersonId: model.PersonId,
    }

    return this.http.post(this.rootURL + '/instructor/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  // KindOfDance
  public getKindOfDanceById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/kindOfDance/' + id, { headers: this.requestHeaderAuthorization });
  }
  public getKindOfDanceAll(): Observable<object> {
    return this.http.get(this.rootURL + '/kindOfDance/all', { headers: this.requestHeaderAuthorization });
  }

  public putKindOfDanceAdd(model: { Name: string }): Observable<object> {
    const body: any = {
      Name: model.Name,
    }

    return this.http.post(this.rootURL + '/kindOfDance/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postKindOfDanceRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/kindOfDance/remove/' + id, { headers: this.requestHeaderAuthorization });
  }


  // Order
  public getOrderById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/order/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getOrderByClientId(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/order/byClient/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getOrderAll(): Observable<object> {
    return this.http.get(this.rootURL + '/order/all', { headers: this.requestHeaderAuthorization });
  }

  public putOrderAdd(model: {
    ClientId: string,
    WholeAmount: number,
    OrderDate: string,
    Discount: number,
  }): Observable<object> {

    const body: any = {
      ClientId: model.ClientId,
      WholeAmount: model.WholeAmount,
      OrderDate: model.OrderDate,
      Discount: model.Discount
    }

    return this.http.post(this.rootURL + '/order/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postOrderRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/order/remove/' + id, { headers: this.requestHeaderAuthorization });
  }

  // Owner
  public getOwnerById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/owner/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getOwnerAll(): Observable<object> {
    return this.http.get(this.rootURL + '/owner/all', { headers: this.requestHeaderAuthorization });
  }

  public putOwnerAdd(model: {
    PersonId: string
  }): Observable<object> {

    const body: any = {
      PersonId: model.PersonId
    }

    return this.http.post(this.rootURL + '/owner/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  // Payment
  public getPaymentById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/payment/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getPaymentByKind(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/payment/byClient/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getPaymentAll(): Observable<object> {
    return this.http.get(this.rootURL + '/payment/all', { headers: this.requestHeaderAuthorization });
  }

  public putPaymentAdd(model: { KindOfPayment: string }): Observable<object> {

    const body: any = {
      KindOfPayment: model.KindOfPayment
    }

    return this.http.post(this.rootURL + '/payment/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postPaymentActivateById(id: string): Observable<object> {
    return this.http.post(this.rootURL + '/payment/activate/' + id, { headers: this.requestHeaderAuthorization });
  }

  public postPaymentDeactivateById(id: string): Observable<object> {
    return this.http.post(this.rootURL + '/payment/deactivate/' + id, { headers: this.requestHeaderAuthorization });
  }

  // Person
  public getPersonById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/person/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getPersonByAspNetUserId(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/person/byAspNetUserId/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getPersonAll(): Observable<object> {
    return this.http.get(this.rootURL + '/person/all', { headers: this.requestHeaderAuthorization });
  }

  public putPersonAdd(model: {
    AspNetUserId: string,
    FirstName: string,
    LastName: string,
    Sex: string,
    Email: string,
    TelephoneNumber: string,
  }): Observable<object> {

    const body: any = {
      AspNetUserId: model.AspNetUserId,
      FirstName: model.FirstName,
      LastName: model.LastName,
      Sex: model.Sex,
      Email: model.Email,
      TelephoneNumber: model.TelephoneNumber,
    }
    return this.http.post(this.rootURL + '/person/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postPersonUpdate(model: {
    Id: string,
    AspNetUserId: string,
    FirstName: string,
    LastName: string,
    Sex: string,
    Email: string,
    TelephoneNumber: string,
  }): Observable<object> {

    const body: any = {
      Id: model.Id,
      AspNetUserId: model.AspNetUserId,
      FirstName: model.FirstName,
      LastName: model.LastName,
      Sex: model.Sex,
      Email: model.Email,
      TelephoneNumber: model.TelephoneNumber,
    }
    return this.http.put(this.rootURL + '/person/update', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postPersonActivateById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/person/remove/' + id, { headers: this.requestHeaderAuthorization });
  }

  // Room
  public getRoomById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/room/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getRoomAll(): Observable<object> {
    return this.http.get(this.rootURL + '/room/all', { headers: this.requestHeaderAuthorization });
  }

  public putRoomAdd(model: { RoomNumber: number }): Observable<object> {

    const body: any = {
      RoomNumber: model.RoomNumber
    }

    return this.http.post(this.rootURL + '/room/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postRoomRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/room/remove/' + id, { headers: this.requestHeaderAuthorization });
  }

  // School
  public getSchoolId(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/school/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getSchoolByName(name: string): Observable<object> {
    return this.http.get(this.rootURL + '/school/byName/' + name, { headers: this.requestHeaderAuthorization });
  }

  public getSchoolAll(): Observable<object> {
    return this.http.get(this.rootURL + '/school/all', { headers: this.requestHeaderContentType });
  }

  public putSchoolAdd(model: {
    Name: string,
    City: string,
    Street: string,
    PostalCode: string,
    EmailAddress: string,
    WebAddress: string,
    TelephoneNumber: string,
    Description: string,
    CreationDate: string,
  }): Observable<object> {

    const body: any = {
      Name: model.Name,
      City: model.City,
      Street: model.Street,
      PostalCode: model.PostalCode,
      EmailAddress: model.EmailAddress,
      WebAddress: model.WebAddress,
      TelephoneNumber: model.TelephoneNumber,
      Description: model.Description,
      CreationDate: model.CreationDate
    }
    //todo add body
    return this.http.post(this.rootURL + 'school/add', JSON.stringify(body), {
      headers: this.requestHeaderAuthorization
    });
  }

  public postSchoolRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + 'school/remove/' + id, { headers: this.requestHeaderAuthorization });
  }


  // SchoolOwner
  public getSchoolOwnerById(ownerId: string): Observable<object> {
    return this.http.get(this.rootURL + '/schoolOwner/owner/' + ownerId, { headers: this.requestHeaderAuthorization });
  }

  public getSchoolOwnerBySchoolId(schoolId: string): Observable<object> {
    return this.http.get(this.rootURL + '/schoolOwner/school/' + schoolId, { headers: this.requestHeaderAuthorization });
  }

  public getSchoolOwnerAll(): Observable<object> {
    return this.http.get(this.rootURL + '/schoolOwner/all', { headers: this.requestHeaderAuthorization });
  }

  public putSchoolOwnerAdd(model: {
    SchoolId: string,
    OwnerId: string,

  }): Observable<object> {

    const body: any = {
      SchoolId: model.SchoolId,
      OwnerId: model.OwnerId,
    }
    //todo add body
    return this.http.post(this.rootURL + '/schoolOwner/add', body, { headers: this.requestHeaderAuthorization });
  }

  // StudyGroup
  public getStudyGroupById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/studyGroup/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getStudyGroupByInstructorId(instructorId: string): Observable<object> {
    return this.http.get(this.rootURL + '/studyGroup/byInstructor/' + instructorId, { headers: this.requestHeaderAuthorization });
  }

  public getStudyGroupByCourse(courseId: string): Observable<object> {
    return this.http.get(this.rootURL + '/studyGroup/byCourse/' + courseId, { headers: this.requestHeaderAuthorization });
  }

  public putStudyGroupAdd(model: {
    InstructorId: string,
    RoomId: string,
    CourseId: string,
    KindOfDanceId: string,
    SchoolId: string,
    StartDate: string
  }): Observable<object> {

    const body: any = {

      InstructorId: model.InstructorId,
      RoomId: model.RoomId,
      CourseId: model.CourseId,
      KindOfDanceId: model.KindOfDanceId,
      SchoolId: model.SchoolId,
      StartDate: model.StartDate,
    }

    return this.http.post(this.rootURL + '/studyGroup/add', JSON.stringify(body), { headers: this.requestHeaderAuthorization });
  }

  public postStudyGroupRemoveById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/studyGroup/remove/' + id, { headers: this.requestHeaderAuthorization });
  }

  // Values
  public getValues(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/api/Values/', { headers: this.requestHeaderAuthorization });
  }

  public postValues(value: any): Observable<object> {
    //todo body
    return this.http.get(this.rootURL + '/api/Values/', { headers: this.requestHeaderAuthorization });
  }

  public deleteValuesById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/api/Values/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getValuesById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/api/Values/' + id, { headers: this.requestHeaderAuthorization });
  }

  public putValuesById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/api/Values/' + id, { headers: this.requestHeaderAuthorization });
  }

  public postPersonGetByEmail(email: string): Observable<object> {
    const body = {
      Email: email
    }
    return this.http.post(this.rootURL + '/person/getByEmail', body, { headers: this.requestHeaderAuthorization });
  }

  public postPersonGetByEmailAndToken(email: string, token: string): Observable<object> {
    const body = {
      Email: email
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.rootURL + '/person/getByEmail', body, { headers: headers });
  }


  // Comments (Opinions)
  public getCommentById(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/comment/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getCommentByClientId(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/comment/client/' + id, { headers: this.requestHeaderAuthorization });
  }

  public getCommentBySchoolId(id: string): Observable<object> {
    return this.http.get(this.rootURL + '/comment/school/' + id, { headers: this.requestHeaderAuthorization });
  }

  public postCommentAdd(body: {
    ClientId: string,
    SchoolId: string,
    Text: string
  }): Observable<object> {
    return this.http.post(this.rootURL + '/comment/add', body, { headers: this.requestHeaderAuthorization });
  }

  public deleteCommentById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/comment/delete/' + id, { headers: this.requestHeaderAuthorization });
  }

  //levels
  public getLevelAll(): Observable<object> {
    return this.http.get(this.rootURL + '/level/all', { headers: this.requestHeaderAuthorization });
  }

  public deleteClientGroupById(id: string): Observable<object> {
    return this.http.delete(this.rootURL + '/clientGroup/remove/' + id, { headers: this.requestHeaderAuthorization });
  }
}
