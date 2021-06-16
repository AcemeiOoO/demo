let tree = {
    value: 2,
    left: {
        value: 3,
        left: null,
        right: {
            value: 5,
            left: null,
            right: null
        },
    },
    right: {
        value: 4,
        left: {
            value: 6,
            left: null,
            right: null
        }, 
        right: {
            value: 7,
            left: {
                value: 8,
                left: null,
                right: null
            },
            right: null
        }
    },
};
// 前序遍历
// 中序遍历
// 后序遍历
// 层序遍历

// 深度优先
function DFS(tree){
    let res = [];
    function bianli(data){
        res.push(data.name);
        if(data.children){
            data.children.forEach((item)=>{
                bianli(item)
            })
        }
    }
    tree.forEach((item)=>{
        bianli(item)
    })
    return res
}
function BFS(tree){
    let res = [];
    let queue = [];
    queue.push(tree);
    while(queue.length!=0){
        let node = queue.shift();
        res.push(node.value);
        node.left&&queue.push(node.left)
        node.right&&queue.push(node.right)
    }
    return res;
}
// console.log('111',DFS(data));
// console.log('111',BFS(tree));


const data = [
{
name: 'a',
children: [
    { name: 'b', children: [{ name: 'e' }] },
    { name: 'c', children: [{ name: 'f' }] },
    { name: 'd', children: [{ name: 'g' }] },
],
},
{
name: 'a2',
children: [
    { name: 'b2', children: [{ name: 'e2' }] },
    { name: 'c2', children: [{ name: 'f2' }] },
    { name: 'd2', children: [{ name: 'g2' }] },
],
}
]


// 深度遍历, 使用递归
function printLeft0(tree){
    let arr = []
    function digui(obj,k){
        arr.push({
            value:obj.value,
            k:k
        })
        if(obj.left){
            digui(obj.left,k+1)
        }
        if(obj.right){
            digui(obj.right,k+1)
        }
    }
    digui(tree,0)
    console.log('arr',arr);
    let k = 0
    for (let i = 0; i < arr.length; i++) {
        if(arr[i].k == k){
            k++;
            console.log(arr[i].value);
        }
    }
}
printLeft0(tree)

function BFSPrint(tree){
    let res = [];
    let queue = [];
    queue.push(tree);
    while(queue.length != 0){
        queue[0]&&res.push(queue[0].value);
        let next = [];
        for(let i = 0; i < queue.length;i++){
            let node = queue[i];
            node.left&&next.push(node.left)
            node.right&&next.push(node.right)
        }
        queue = next
    }
    console.log('123',res);
}
BFSPrint(tree)

// 二叉树
/*
          2
3                  4
    5       6          7
                    8
*/
// 实现一个方法leftSideView，打印出二叉树每行的第一个存在的数，如图例，打印出2，3，5，8