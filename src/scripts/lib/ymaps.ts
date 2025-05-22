await ymaps3.ready;

export const {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer,
    YMapListener,
} = ymaps3;

export const {
    YMapClusterer,
    clusterByGrid
} = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');

export type YMap = InstanceType<typeof YMap>;
export type YMapMarker = InstanceType<typeof YMapMarker>;