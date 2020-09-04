import React from "react";
import lunr from "lunr";

function useLunrIndex({ documents, fields }) {
  const indexRef = React.useRef<any>();
  React.useEffect(() => {
    indexRef.current = lunr(function () {
      fields.forEach((fieldName) => this.field(fieldName));
      this.ref("name");

      documents.forEach(function (doc) {
        this.add(doc);
      }, this);
    });
  }, [documents, fields]);
  return indexRef.current;
}

export { useLunrIndex };
