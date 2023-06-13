export default function CommentForm() {
  return (
    <div className="w-max-[751px] w-full bg-grey-10 py-9 px-11 rounded">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-[32px] h-[32px] bg-random-profile-1 rounded-full flex justify-center items-center font-inter font-medium text-sm text-grey-whiteFixed">
          SL
        </div>
        <span className="text-sm font-medium font-inter text-grey-0">Samuel Leão</span>
      </div>
      <form>
        <div className="relative">
          <textarea
            placeholder="Carro muito confortável, foi uma ótima experiência de compra..."
            className="w-full h-32 py-5 text-base font-normal border-2 rounded outline-none resize-none border-grey-7 px-7 font-inter text-grey-3 decoration-transparent"
          >
          </textarea>
          <button
            type="submit"
            className="absolute z-10 px-5 py-3 text-sm font-semibold rounded right-3 bottom-4 bg-brand-1 text-grey-whiteFixed"
          >Comentar</button>
        </div>
      </form>
      <div className="flex gap-2">
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7">Gostei muito!</span>
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7">Incrível</span>
        <span className="px-3 py-1 text-xs font-medium rounded-full font-inter text-grey-3 bg-grey-7">Recomendarei para meus amigos!</span>
      </div>
    </div>
  );
}
