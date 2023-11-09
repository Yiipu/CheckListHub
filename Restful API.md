| 需求说明       | 请求uri                  | 请求方式 | 请求头                             | 响应数据                                                     |
| -------------- | ------------------------ | -------- | ---------------------------------- | ------------------------------------------------------------ |
| 查询checklist  | check/{cid}              | get      | "uid"=#{uid}<br>"tid"=#{tid}<br/>  | {   "code":"200",   "message":"success"   <br />"data":{cheklist}<br /> } |
| 添加收藏       | check/favor/put/{cid}    | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":[]<br /> } |
| 删除收藏       | check/favor/delete/{cid} | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":{collection}<br /> } |
| 查询是否为收藏 | check/favor/(cid}        | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":{boolean}<br /> } |
| 查询best集合   | collection/best          | get      | /                                  | {   "code":"200",   "message":"success"   <br />"data":[......]<br /> } |
| 查询favor集合  | collection/favor         | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":[......]<br /> } |
| 查询recent集合 | collection/recent        | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":[......]<br /> } |
| 查询team集合   | collection/team          | get      | "uid"=#{uid}                       | {   "code":"200",   "message":"success"   <br />"data":[......]<br /> } |
| 根据header搜索 | search/{header}          | get      | /                                  | {   "code":"200",   "message":"success"   <br />"data":[......]<br /> } |
| 创建团队       | share                    | get      | "uid"=#{uid}<br/>"cid"=#{cid}<br/> | {   "code":"200",   "message":"success"   <br />"data":[tid]<br /> } |
| 加入团队       | share/{tid}              | get      | "uid"=#{uid}<br/>"cid"=#{cid}<br/> | {   "code":"200",   "message":"success"   <br />"data":[cid]<br /> } |
| 退出团队       | share/delete/{tid}       | get      | "uid"=#{uid}<br/>"cid"=#{cid}      | {   "code":"200",   "message":"success"   <br />"data":[]<br /> } |
| 用户初始化     | user                     | get      | "uid"=#{uid}<br/>                  | {   "code":"200",   "message":"success"   <br />"data":[]<br /> } |

