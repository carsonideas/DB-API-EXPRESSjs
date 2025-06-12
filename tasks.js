
export function validateMyTasks(req, res, next) {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ message: "HOUSTON!!   Title is required...." });
  }

  if (!description) {
    return res.status(400).json({ message: "HOUSTON!!   Content is required...." });
  }

  next();
}
