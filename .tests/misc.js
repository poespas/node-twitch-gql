
const CheckModel = (value, model, layerName = null) => {
    for (const key in model) {
        if (Object.hasOwnProperty.call(model, key)) {
            const type = model[key];
            
            if (typeof type === "object") {
                CheckModel(value[key], type, key);
                continue;
            }
            
            try {
                expect(value[key]).toBeDefined();
            } catch (e) {
                throw new Error(
                    `Key ${JSON.stringify(key)} expected to be defined${layerName ? ` in ${layerName}` : ''}.`,
                    e
                );
            }
                
            try {
                expect(value[key]).toEqual(expect.any(type));
            } catch (e) {
                throw new Error(
                    `Key ${JSON.stringify(key)}${layerName ? ` in ${layerName}` : ''} is not the expected type ${JSON.stringify(
                        type
                    )}, but was ${JSON.stringify(typeof value[key])} instead`,
                    e
                );
            }
        }
    }
};

module.exports = { CheckModel };