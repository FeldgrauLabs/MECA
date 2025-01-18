const Emoticons1 = [
  '( ˘͈ ᵕ ˘͈♡)',
  '(づ￣ ³￣)づ',
  'ᕦ(ò_óˇ)ᕤ',
  '(︶︹︺)',
  'ಠ_ಠ',
  '(ง •̀ゝ•́)ง',
  '(◐ ε ◑)',
  '( ˘▽˘)っ♨',
  '(っ◔◡◔)っ 🍔'
];

const Duplicated = [...Emoticons1, ...Emoticons1, ...Emoticons1, ...Emoticons1, ...Emoticons1, ...Emoticons1]

export const FlashBanner = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="relative overflow-hidden h-full">
        <div className="absolute whitespace-nowrap animate-scroll-left flex gap-16 lg:gap-20 text-lg">
          {Duplicated.map((emoticon, index) => (
            <div key={index}>{emoticon}</div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden h-full">
        <div className="absolute whitespace-nowrap animate-scroll-right flex gap-16 lg:gap-20 text-lg">
          {Duplicated.map((emoticon, index) => (
            <div key={index}>{emoticon}</div>
          ))}
        </div>
      </div>
    </div>

  );
};