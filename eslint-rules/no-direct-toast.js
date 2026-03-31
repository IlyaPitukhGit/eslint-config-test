module.exports = {
  meta: {
    type: 'problem',
    messages: {
      noToast: 'Use ToastService instead of direct Toast API',
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        const callee = node.callee;

        if (
          callee.type === 'MemberExpression' &&
          callee.object?.name === 'Toast' &&
          ['show', 'hide'].includes(callee.property?.name)
        ) {
          context.report({
            node,
            messageId: 'noToast',
          });
        }
      },
    };
  },
};