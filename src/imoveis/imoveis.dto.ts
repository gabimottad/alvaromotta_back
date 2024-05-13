export type ImagensDTO = {
    id: number;
    url: string;
    imovelId: number;
};

export type ImoveisDTO = {
    name: string;
    description: string;
    price: number;
    location: string;
    city: string;
    link: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    suites: number;
    area: number;
    areaTotal: number;
    createdAt?: Date;
    images?: ImagensDTO[];
};
