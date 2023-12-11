import { useState } from "react";
import getInputValue from "../../../util/getinputvalue.ts";
import getAspectRatio from "../../../util/aspectratio.ts";

export const title = "Aspect Ratio Calculator"
export const description = "Calculates the missing width/height value when resizing one value in a given aspect ratio"

const ARC = () => {
	const [ ogWidth, setOGWidth ] = useState( 1920 )
	const [ ogHeight, setOGHeight ] = useState( 1080 )
	const [ newWidth, setNewWidth ] = useState<number | string>( "" )
	const [ newHeight, setNewHeight ] = useState<number | string>( "" )

	const [ aspectRatio, setAspectRatio ] = useState( "16:9" )

	return (
		<>
			<div className={"flex flex-wrap gap-3"}>
				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">Original Width/Height</h3>
					<div className={"flex flex-col gap-3"}>
						<div>
							<label htmlFor={"og-w"} className={"block mb-2 text-lg"}>Width</label>
							<input
								type={"number"}
								pattern={"[0-9]*"}
								id={"og-w"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								placeholder={"1920"}
								defaultValue={ogWidth}
								onChange={async (c) => {
									const value = parseInt(getInputValue(c))
									await setOGWidth(value)

									const aspRatio = getAspectRatio(value, ogHeight)

									setAspectRatio(aspRatio)

									if (newWidth != "") {
										setNewHeight("")
										setNewWidth("")
									}
								}}
							/>
						</div>

						<div>
							<label htmlFor={"og-h"} className={"block mb-2 text-lg"}>Height</label>
							<input
								type={"number"}
								pattern={"[0-9]*"}
								id={"og-h"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								placeholder={"1080"}
								defaultValue={ogHeight}
								onChange={async (c) => {
									const value = parseInt(getInputValue(c))
									await setOGHeight(value)

									const aspRatio = getAspectRatio(value, ogHeight)

									setAspectRatio(aspRatio)

									if (newWidth != "") {
										setNewHeight("")
										setNewWidth("")
									}
								}}
							/>
						</div>
					</div>
				</div>

				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">New Width/Height</h3>
					<div className={"flex flex-col gap-3"}>
						<div>
							<label htmlFor={"new-w"} className={"block mb-2 text-lg"}>Width</label>
							<input
								type={"number"}
								pattern={"[0-9]*"}
								id={"new-w"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								onChange={async (c) => {
									setNewWidth(parseInt(getInputValue(c)))
									const value = Math.ceil((ogHeight / ogWidth) * parseInt(getInputValue(c)))

									setNewHeight(isNaN(value) ? "" : value)
								}}
								value={newWidth}
							/>
						</div>

						<div>
							<label htmlFor={"new-h"} className={"block mb-2 text-lg"}>Height</label>
							<input
								type={"number"}
								pattern={"[0-9]*"}
								id={"new-h"}
								className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}
								value={newHeight}
								onChange={async (c) => {
									setNewHeight(parseInt(getInputValue(c)))
									const value = Math.ceil((ogWidth / ogHeight) * parseInt(getInputValue(c)))

									setNewWidth(isNaN(value) ? "" : value)
								}}
							/>
						</div>
					</div>
				</div>
			</div>


			<p className="text-xl font-medium leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
				Aspect Ratio - {aspectRatio}
			</p>
		</>
	)
}

export default ARC