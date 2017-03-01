const map = {
  202:  '用户名已被占用',
  217:  '无效的用户名',
  unknown:  '注册失败，请稍后再试'
}
export default function({code}){
  return map[code] || map.unknown
}
