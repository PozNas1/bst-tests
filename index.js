function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = null;
}


BinarySearchTree.prototype.root = function () {
    return this._root ? this._root.value : null;
}

BinarySearchTree.prototype.insert = function (key, value) {
    var node = new Node(key, value);
    var parent = this._root;
    if (this._root === null) {
        this._root = node;
    } else {
      recurse(parent);
    };

    function recurse (parent){
        if (node.key < parent.key && parent.left === null) {
            parent.left = node;
        } else if (node.key < parent.key) {
            recurse(parent.left);
        }
         if (node.key > parent.key && parent.right === null) {
            parent.right = node;
        } else if (node.key > parent.key) {
            recurse(parent.right);
        }
    }
    return this;
}

BinarySearchTree.prototype.contains = function (value) {
    var parent = this._root;

    function recurse(parent) {
      if (parent) {
        if (parent.value === value) {
            return true;
        } else {
          if (parent.left || parent.right) {
            var res;
            if (parent.left) {
              res = recurse (parent.left);
            }
            if (!res && parent.right) {
              res = recurse (parent.right);
            }
            return res;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    return recurse(parent);
}


BinarySearchTree.prototype.delete = function (key) {
    function recurse(parent, prev) {
      if (parent) {
        if (parent.key === key) {
            deleteRecurse(parent, prev);
        } else if (parent.left && parent.key > key) {
            recurse (parent.left, parent);
        } else if (parent.right && parent.key < key) {
            recurse (parent.right, parent);
        }
      }
    }

    function deleteRecurse(node, prev) {
      var new_node = null;

      if (node.right) {
        var cur = node.right.left;
        var prev_cur = node.right;

        if (cur) {
          while (cur.left) {
            prev_cur = cur;
            cur = cur.left;
          }

          new_node = cur;
          prev_cur.left = cur.right;
          new_node.left = node.left;
          new_node.right = node.right;
        } else {
          new_node = prev_cur;
          new_node.left = node.left;
        }
      } else if (node.left) {
        var cur = node.left.right;
        var prev_cur = node.left;

        if (cur) {
          while (cur.right) {
            prev_cur = cur;
            cur = cur.right;
          }

          new_node = cur;
          prev_cur.right = cur.left;
          new_node.left = node.left;
          new_node.right = node.right;
        } else {
          new_node = prev_cur;
          new_node.right = node.right;
        }
      }

      if (prev) {
        if (prev.right === node) {
          prev.right = new_node;
        } else {
          prev.left = new_node;
        }
      }
      if (this._root === node) {
        this._root = new_node;
      }
    }

    recurse(this._root, null);

    return this;
}


BinarySearchTree.prototype.search = function (key) {
    var parent = this._root;
    var result = null;
    function recurse(parent) {
      if (parent) {
        if (parent.key === key) {
            result = parent.value;
        } else if (parent.left && parent.key > key) {
            recurse (parent.left);
        } else if (parent.right && parent.key < key) {
            recurse (parent.right);
        }
      }
    }
    recurse(parent);

    return result;
}


BinarySearchTree.prototype.verify = function () {
    var parent = this._root;

    function recurse(parent) {
      if (parent) {
        if (parent.left && parent.left.key > parent.key) {
            return false;
        } else if (parent.right && parent.right.key < parent.key) {
            return false;
        } else {
          var res = true;
          if (parent.left) {
            res = res && recurse(parent.left);
          }
          if (res && parent.right) {
            res = res && recurse(parent.right);
          }
          return res;
        }
      }
    }

    return recurse(parent);
}



module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'STUDENT NAME'
};
