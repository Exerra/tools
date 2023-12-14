import React, { useState } from "react";
import getInputValue from "../../../util/getinputvalue";

export const title = "Death/Birth Coefficient Calculator"
export const description = "Calculate the death/birth coefficient based on death/birth rates and the population"

const calculateCoefficient = (value: number, population: number, rounding?: number) => {
	if (!value || !population) return "Not calculated yet"

	if (!rounding) return (value / population) * 1000

	return +(Math.round(Number( ((value / population) * 1000) + `e+${rounding}` )) + `e-${rounding}`)
}

const DBCC = () => {
	const [ population, setPopulation ] = useState<number>()
	const [ deathsBirths, setDeathsBirths ] = useState<number>()
	const [ rounding, setRounding ] = useState<number | undefined>()

	return (
		<>
			<div className={"flex flex-wrap gap-3"}>
				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4 dark:border-slate-800">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">Population</h3>
					<input
						type={"number"}
						pattern={"[0-9]*"}
						id={"population-input"}
						className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 bg-transparent"}
						placeholder={"1883008"}
						onChange={(c) => {
							setPopulation(getInputValue(c))
						}}
					/>
				</div>

				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4 dark:border-slate-800">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">Deaths/Births</h3>
					<input
						type={"number"}
						pattern={"[0-9]*"}
						id={"deathbirth-input"}
						className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 bg-transparent"}
						placeholder={"1000"}
						onChange={(c) => {
							setDeathsBirths(getInputValue(c))
						}}
					/>
				</div>

				<div className="flex w-full shrink-0 grow flex-col rounded-xl border-2 border-slate-200 p-5 lg:basis1/3 xl:basis-1/4 dark:border-slate-800">
					<h3 className=" text-2xl font-bold leading-tight tracking-tighter mb-5">Rounding (optional)</h3>
					<input
						type={"number"}
						pattern={"[0-9]*"}
						id={"rounding"}
						className={"flex w-full h-10 rounded-lg border px-3 py-2 text-sm ring-offset-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 bg-transparent"}
						placeholder={"2"}
						onChange={(c) => {
							setRounding(getInputValue(c))
						}}
					/>
				</div>
			</div>

			<p className="text-xl font-medium leading-tight tracking-tighter sm:text-xl md:text-2xl lg:text-3xl">
				Coefficient - {calculateCoefficient(deathsBirths!, population!, rounding)}
			</p>
		</>
	)
}

export default DBCC