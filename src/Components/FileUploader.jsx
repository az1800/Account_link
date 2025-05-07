export default function FileUploader() {
  return (
    <div className="w-[21rem] mx-auto">
      <label htmlFor="file_input" className="mt-2">
        Upload a profile picture
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mt-2"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
      />
      <p
        className="my-2 text-sm text-black dark:text-gray-300"
        id="file_input_help"
      >
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </div>
  );
}
