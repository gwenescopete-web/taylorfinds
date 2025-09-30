import React from 'react'
import { Title } from '../ui/text'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const priceArray = [
  { title: "Under ₱400", value: "under-400" },
  { title: "₱400 to ₱800", value: "400-800" },
  { title: "₱800 to ₱1200", value: "800-1200" },
  { title: "₱1200 & Above", value: "1200-above" },
]

interface Props {
  selectedPrice?: string | null 
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">
        Price
      </Title>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div key={index} onClick={() => setSelectedPrice(price?.value)} className="flex items-center space-x-2 hover:cursor-pointer">
            <RadioGroupItem value={price?.value} id={price?.value} className="rounded-sm"/>
            <Label htmlFor={price?.value} className={`${selectedPrice === price?.value ? "font-semibold text-shop-midnight-blue" : "font-normal"}`}>
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button onClick={() => setSelectedPrice(null)} className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop-royal-blue hoverEffect text-left">
          Reset Selection
        </button>
      )}
    </div>
  )
}

export default PriceList