iD.Style = {};
iD.Style.highway_stack = {
    motorway: 0,
    motorway_link: 1,
    trunk: 2,
    trunk_link: 3,
    primary: 4,
    primary_link: 5,
    secondary: 6,
    tertiary: 7,
    unclassified: 8,
    residential: 9,
    service: 10,
    footway: 11
};

iD.Style.waystack = function(a, b) {
    if (!a || !b) return 0;
    if (a.tags.layer !== undefined && b.tags.layer !== undefined) {
        return a.tags.layer - b.tags.layer;
    }
    if (a.tags.bridge) return 1;
    if (b.tags.bridge) return -1;
    var as = 0, bs = 0;
    if (a.tags.highway && b.tags.highway) {
        as -= iD.Style.highway_stack[a.tags.highway];
        bs -= iD.Style.highway_stack[b.tags.highway];
    }
    return as - bs;
};


iD.Style.TAG_CLASSES = {
    'highway': true,
    'railway': true,
    'motorway': true,
    'amenity': true,
    'landuse': true,
    'building': true,
    'bridge': true
};

iD.Style.styleClasses = function(pre) {
    return function(d) {
        var tags = d.tags;
        var c = [pre];
        for (var k in tags) {
            if (!iD.Style.TAG_CLASSES[k]) continue;
            c.push(k + '-' + tags[k]);
            c.push(k);
        }
        return c.join(' ');
    };
};