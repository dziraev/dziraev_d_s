const arr = [ {}, 5, 7, 
    [ 4, [2], 8, [1,'abc',3], 2 ], 
    [ 9, [[[4, 5, [{}]]]] ], 
    1, 8
  ];


function treeSum(a) {
    let sum = 0;
    for(let i = 0; i < a.length; i++)
        sum+= typeof a[i] == 'number' ? a[i] : Array.isArray(a[i]) ?
                                                             treeSum(a[i]) : 0;
    return sum;
}
