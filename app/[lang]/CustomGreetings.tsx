import { currentUser } from "@clerk/nextjs/server";

export async function CustomGreetings() {
  const user = await currentUser();
  let name;

  if (user && (user.firstName || user.lastName)) {
    name = `${user.firstName} ${user.lastName}`;
  }

  return (
    <div className="flex grow items-end justify-center">
      {name && (
        <div className="flex items-end p-3 m-2 bg-purple-600 text-gray-50 rounded-xl rounded-bl-none text-sm transform translate-x-28 max-w-40">
          <span className="truncate">
            Hello {name}
          </span>
        </div>
      )}
    </div>
  )
}