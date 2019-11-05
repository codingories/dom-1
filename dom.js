window.dom = {
  // 以下是增
  create(string) {
    const container = document.createElement("template"); // template标签可以容纳任意元素
    container.innerHTML = string.trim();
    return container.content.firstChild; // 获取template第一个元素
  },
  after(node, node2) {
    // console.log(node.nextSibling);
    node.parentNode.insertBefore(node2, node.nextSibling); // 这个特别肮脏
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  append(parent, node) {
    parent.appendChild(node);
  },
  wrap(node, parent) {
    dom.before(node, parent); // 把parent放到node前面
    dom.append(parent, node); // 把node放到parent里面
  },
  // 以上是增
  // ============
  // 以下是删除
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    // 干掉所有的儿子
    // const childNodes = node.childNodesv v
    // const { childNodes } = node;
    // console.log(childNodes);
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  // 以上是删
  // ===================
  // 以下是改
  attr(node, name, value) {
    // 重载 ,在js中参数个数不同就是重载
    if (arguments.length === 3) {
      // 如果长度为3就set
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    // 适配
    // console.log("innerText" in node);
    if (arguments.length === 2) {
      if ("textContent" in node) {
        node.textContent = string; // firefox / chrome
      } else {
        node.innerText = string; // ie
      }
    } else if (arguments.length === 1) {
      if ("textContent" in node) {
        return node.textContent;
      } else {
        return node.innerText;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    }
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  // 以上是改
  // ===========
  // 以下是查

  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter(n => n !== node); // 伪数组变数组，n不等于传进来的node
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]); // 没有this
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  }

  // 以上是查
};
