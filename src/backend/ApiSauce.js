import {create} from 'apisauce';
import {ApiSauceJson, ApiSauceMultipart, ApiSauceJson1} from './Config';
const ApiSauce = create(ApiSauceJson);

export const ApiSauceMu = create(ApiSauceMultipart);
export const ApiSauce1 = create(ApiSauceJson1);
export const _SetAuthToken = jwt => {
  ApiSauce.setHeader('Authorization', jwt);
  ApiSauceMu.setHeader('Authorization', jwt);
};
export const _RemoveAuthToken = () => {
  ApiSauce.deleteHeader('Authorization');
  ApiSauceMu.deleteHeader('Authorization');
};
export default ApiSauce;
