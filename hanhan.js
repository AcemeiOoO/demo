// 0s后输出 10个10
// for(var i=0;i<10;i++){
//     (function(){
//         var j=i;
//     //     // j是函数内部变量
//         setTimeout(()=>{
//             console.log(j);
//         },1000)
//     })()
// }
// 利用一个对象
function interval(func, w){
    var interv = function(){
            setTimeout(interv, w);
            try{
                func.call(null);
            }
            catch(e){
                throw e.toString();
            }
    };
    setTimeout(interv, w);
};
// interval(function(){
//     console.log('111');
// },1000)

var arr = [

    { id: 1, name: '1', },
    
    { id: 2, name: '1-1', parentId: 1 },
    
    { id: 3, name: '1-1-1', parentId: 2 },
    
    { id: 4, name: '1-2', parentId: 1 },
    
    { id: 5, name: '1-2-2', parentId: 4 },
    
    { id: 6, name: '1-1-1-1', parentId: 3 },
    
    { id: 7, name: '2', }
    
]
// 这个可以 但是数据里面有parentId
    function translateDataToTree(data) {
        let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null)
        let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)
        let translator = (parents, children) => {
            parents.forEach((parent) => {
                children.forEach((current, index) => {
                    if (current.parentId === parent.id) {
                        let temp = JSON.parse(JSON.stringify(children))
                        temp.splice(index, 1)
                        translator([current], temp)
                        typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
                    }
                }
                )
            }
            )
        }
    
        translator(parents, children)
    
        return parents
    }

    console.log(translateDataToTree(arr));

    function fn(...args) {
        // TODO;
        let arr = [];
        arr.push(...args);
        function fn(){
            arr.push(...arguments);
            return fn;
        }
        fn.getValue = function(){
            return arr.reduce((a,b)=>{
                return a+b;
            })
        }
        return fn
    }
    var f1 = fn(1,2,3);
    console.log(f1.getValue()); // 6
    var f2 = fn(1)(2,3)
    console.log(f2.getValue()); // 6
    var f3 = fn(1)(2)(3)(4);
    console.log(f3.getValue()); // 10



// const text = `
// - 章节一
//   - 标题一
//   - 标题二
//     - 子标题三
// - 章节二
//   - 标题一
//   - 标题二
// `
// class Node {
//     constructor({ value, level }) {
//         this.value = value;
//         this.level = level; 
//         this.children = [];
//         this.parent = '';
//         // hint:也可在数据结构中增加this. parent 节点辅助解析
//     }
// }
// function parseTree(text) {
//     // TODO
//     console.log(text.split('\n'));
//     let list = [];
//     let arr = text.split('\n');
//     list.push(new Node({value:arr[1].split('-')[1].slice(1),level:1}));
//     let lastNode = list[0];
//     for(let i=2;i < arr.length;i++){
//         if(arr[i]){
//             let node = new Node({value:arr[i].split('-')[1].slice(1),level:parseInt(arr[i].split('-')[0].length/2)+1});
//             if(node.level == 1){
//                 list.push(node);
//                 lastNode = node;
//                 continue;
//             }
//             while(lastNode.level >= node.level){
//                 lastNode = lastNode.parent;
//             }
//             lastNode.children.push(node);
//             node.parent = lastNode;
//             lastNode = node;
//         }
//     }
//     console.log(list);
//     console.log(list[0].children);
// }
// const tree = parseTree(text); 
// // [ Node { value: “章节一”，children: [ Node, Node ], level: 1 },
// // Node { value: “章节二”，children: [ Node, Node ], level: 1 } ]
