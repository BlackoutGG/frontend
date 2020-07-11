const isString = val => typeof val === "string";
const isArray = val => Array.isArray(val);

const hasScope = required => {
  if (required) {
    if (isString(required)) {
      required = [[required]];
    } else if (isArray(required) && required.every(isString)) {
      required = [required];
    }
  }

  let permissions = this.user.scope;

  if (!permissions) {
    throw new Error("User permissions are missing.");
  }

  if (isString(permissions)) {
    permissions = permissions.split(" ");
  }

  if (!isArray(permissions)) {
    throw new Error("User permissions should be an array.");
  }

  const sufficient = required.some(req =>
    req.every(perm => permission.indexOf(perm) !== -1)
  );

  return sufficient;
};

export default scope => ({ $auth, redirect }) => {
  if ($auth.loggedIn && $auth.user.scope.indexOf(scope) === -1) {
    redirect("/");
  }
};
