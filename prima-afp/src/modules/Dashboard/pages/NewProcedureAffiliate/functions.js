export function prepareCategories(categories, user, inRepresentative) {
  const orderApplicant = [10, 11, 7, 8, 3, 6, 1, 2, 5, 9, 4, 12];
  const orderAffiliate = [10, 7, 8, 3, 6, 1, 2, 5, 9, 4];
  const orderRepresentative = [10, 11, 7, 8, 3, 6, 1, 2, 5, 9, 4];

  const excludeApplicant = [61, 62, 66];
  const excludeAffiliate = [67, 68, 69, 70, 71, 72, 73, 74, 76, 77, 78, 79];
  const excludeRepresentative = [61, 62, 66];

  let categoriesOrdered = [];
  const order =
    user.usertype === "affiliate"
      ? inRepresentative
        ? orderRepresentative
        : orderAffiliate
      : inRepresentative
      ? orderApplicant
      : "";

  const exclude =
    user.usertype === "affiliate"
      ? inRepresentative
        ? excludeRepresentative
        : excludeAffiliate
      : excludeApplicant;

  const extractExcluded = (request) => {
    return exclude.includes(request.idTypeRequest) ? false : request;
  };
  const searchTypeRequests = (category) => {
    category.typeRequests = category.typeRequests.filter((item) =>
      extractExcluded(item)
    );
    return category;
  };
  if (categories && categories.length > 0) {
    order.forEach((index) => categoriesOrdered.push(categories[index - 1]));
    const filterCategories = categoriesOrdered.filter(
      (category) => category.typeRequests.length > 0
    );
    const excludeProcedures = filterCategories.map((category) =>
      searchTypeRequests(category)
    );
    categoriesOrdered = excludeProcedures;
  }
  return categoriesOrdered;
}
