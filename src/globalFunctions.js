export function rotateAboutPoint(obj, point, axis, theta){
    obj.parent.localToWorld(obj.position);
    obj.position.sub(point);
    obj.position.applyAxisAngle(axis, theta);
    obj.position.add(point);
    obj.parent.worldToLocal(obj.position);
    obj.rotateOnAxis(axis, theta);
}