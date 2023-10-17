import React from "react";

const requestMethods = [
  {
    slug: "get",
    method: "GET",
  },
  {
    slug: "post",
    method: "POST",
  },
  {
    slug: "put",
    method: "PUT",
  },
  {
    slug: "patch",
    method: "PATCH",
  },
  {
    slug: "delete",
    method: "DELETE",
  },
];

export default function UrlEditor({
  url,
  setUrl,
  reqMethod,
  setReqMethod,
  onInputSend,
}) {
  return (
    <>
      <form className="flex">
        <select
          className="px-4 py-2 border rounded-md border-border hover:border-secondary focus:outline-none bg-secondary text-secondary3"
          value={reqMethod}
          onChange={(e) => setReqMethod(e.target.value)}
        >
          {requestMethods.map((option) => (
            <option key={option.slug} value={option.method}>
              {option.method}
            </option>
          ))}
        </select>
        <input
          className="ml-3 w-full px-4 py-2 border bg-primary rounded-md border-border hover:border-secondary focus:outline-secondary text-secondary3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          className="ml-3 px-6 py-2 rounded-md font-semibold text-secondary3 bg-secondary hover:bg-secondary2"
          type="button"
          onClick={(e) => onInputSend(e)}
        >
          Send
        </button>
      </form>
    </>
  );
}
