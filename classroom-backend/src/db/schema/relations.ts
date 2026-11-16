
import { defineRelations } from "drizzle-orm";
import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  // Authentication
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    classes: r.many.classes(),
    enrollments: r.many.enrollments(),
  },

  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },

  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },

  // School management
  departments: {
    subjects: r.many.subjects(),
  },

  subjects: {
    department: r.one.departments({
      from: r.subjects.departmentId,
      to: r.departments.id,
    }),
    classes: r.many.classes(),
  },

  classes: {
    subject: r.one.subjects({
      from: r.classes.subjectId,
      to: r.subjects.id,
    }),
    teacher: r.one.user({
      from: r.classes.teacherId,
      to: r.user.id,
    }),
    enrollments: r.many.enrollments(),
  },

  enrollments: {
    student: r.one.user({
      from: r.enrollments.studentId,
      to: r.user.id,
    }),
    class: r.one.classes({
      from: r.enrollments.classId,
      to: r.classes.id,
    }),
  },
}));
