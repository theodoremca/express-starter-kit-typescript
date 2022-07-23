
export const indexService = (Model:any) => {
  return new Promise((resolve, reject) => {
    // let builder = null;
    Model.find()
        .then((response:any) => {
          resolve(response);
        })
        .catch((error:any) => {
          reject(error);
        });
  });
};

export const showService = (Model:any, id:string) => {
  return new Promise((resolve, reject) => {
    Model.findById(id)
        .then((response:any) => {
          resolve(response);
        })
        .catch((error:any) => {
          reject(error);
        });
  });
};

export const createService = (Model:any, data:any) => {
  return new Promise((resolve, reject) => {
    const model = new Model(data);
    model
        .save()
        .then((response:any) => {
          resolve(response);
        })
        .catch((error:any) => {
          reject(error);
        });
  });
};

export const destroyService = (Model:any, id:string) => {
  return new Promise((resolve, reject) => {
    Model.findByIdAndDelete(id)
        .then((response:string) => {
          resolve(response);
        })
        .catch((error:string) => {
          reject(error);
        });
  });
};


export const updateService = (Model:any, id:string, data:any) => {
  return new Promise((resolve, reject) => {
    Model.findByIdAndUpdate(id, data, {new: true})
        .then((response:string) =>
          resolve(response)
        )
        .catch((error:any) => {
          reject(error);
        });
  });
};

