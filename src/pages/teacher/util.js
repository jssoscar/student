/*
 * @Author			jssoscar
 * @Date			2018-01-01 00:21:44 
 * @Version			1.0 
 * @Description	
 */

 export const addKey = data => {
     let result = [...data];

     result.forEach((val, index) => {
         val.key = index;
     });

     return result;
 };

 /**
 * default pagination
 */
const defaultPagination = {
    current: 1,
    pageSize: 15,
    pageSizeOptions: ['10', '15', '20', '30', '50'],
    showSizeChanger: true,
    showTotal: total => `总共 ${total} 条`
}

export const getPagination = config => ({
    ...defaultPagination,
    ...config
});