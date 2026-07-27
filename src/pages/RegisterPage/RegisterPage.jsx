import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Mail,
  User,
  AtSign,
  AlignLeft,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";
import { AuthCard } from "../../components/common/auth/AuthCard/AuthCard";
import { AuthFooter } from "../../components/common/auth/AuthFooter/AuthFooter";
import { SpecialtySelector } from "../../components/common/auth/SpecialtySelector/SpecialtySelector";
import { FormInput } from "../../components/ui/FormInput/FormInput";
import { PasswordInput } from "../../components/ui/PasswordInput/PasswordInput";
import { SubmitButton } from "../../components/ui/SubmitButton/SubmitButton";
import { AvatarPreview } from "../../components/ui/AvatarPreview/AvatarPreview";
import { TextareaInput } from "../../components/ui/TextareaInput/TextareaInput";
import "./RegisterPage.scss";

const TOTAL_STEPS = 2;
const STEP_ONE_FIELDS = ["fullName", "email", "password", "specialty"];

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    specialty: null,
    bio: "",
    avatarUrl: "",
    username: "",
    portfolioUrl: "",
    instagramUrl: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const updateField = (field) => (e) => {
    const value = typeof e === "string" ? e : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStepOne = () => {
    const errors = {};
    if (!formData.fullName.trim())
      errors.fullName = "El nombre completo es obligatorio";
    if (!formData.email.trim()) errors.email = "El email es obligatorio";
    if (!formData.password.trim())
      errors.password = "La contraseña es obligatoria";
    if (!formData.specialty)
      errors.specialty = "Selecciona tu especialidad principal";
    return errors;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    const errors = validateStepOne();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const suggestedUsername = formData.email.split("@")[0];
    setFormData((prev) => ({ ...prev, username: suggestedUsername }));
    setFieldErrors({});
    setCurrentStep(2);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
    setFieldErrors({});
    setGeneralError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setFieldErrors({});

    if (!formData.username.trim()) {
      setFieldErrors({ username: "El nombre de usuario es obligatorio" });
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      navigate("/feed");
    } catch (err) {
      const status = err.response?.status;
      const data = err.response?.data;

      if (status === 400 && data?.fields) {
        setFieldErrors(data.fields);

        const hasStepOneError = Object.keys(data.fields).some((field) =>
          STEP_ONE_FIELDS.includes(field),
        );
        if (hasStepOneError) {
          setCurrentStep(1);
        }
      } else if (status === 409) {
        setGeneralError(
          data?.error || "Ese usuario o email ya está registrado",
        );
      } else {
        setGeneralError(
          data?.error || "Ocurrió un error inesperado. Inténtalo de nuevo.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Collapp"
      subtitle={
        currentStep === 1
          ? "Únete a la comunidad creativa."
          : "Completa tu perfil."
      }
      footer={
        <AuthFooter
          prompt="¿Ya tienes cuenta?"
          linkText="Iniciar Sesión"
          to="/login"
        />
      }
    >
      <p className="sr-only" aria-current="step">
        Paso {currentStep} de {TOTAL_STEPS}
      </p>

      {generalError && (
        <p className="auth-error-message" role="alert">
          {generalError}
        </p>
      )}

      {currentStep === 1 ? (
        <form onSubmit={handleNextStep} className="register-form" noValidate>
          <FormInput
            id="fullName"
            type="text"
            label="Nombre Completo"
            icon={User}
            placeholder="Alex García"
            value={formData.fullName}
            onChange={updateField("fullName")}
            error={fieldErrors.fullName}
            autoComplete="name"
            required
          />
          <FormInput
            id="email"
            type="email"
            label="Correo Electrónico"
            icon={Mail}
            placeholder="collapp@example.com"
            value={formData.email}
            onChange={updateField("email")}
            error={fieldErrors.email}
            autoComplete="email"
            required
          />
          <PasswordInput
            id="password"
            label="Password"
            value={formData.password}
            onChange={updateField("password")}
            error={fieldErrors.password}
            autoComplete="new-password"
            required
          />
          <SpecialtySelector
            id="specialty"
            label="Especialidad principal"
            value={formData.specialty}
            onChange={updateField("specialty")}
            error={fieldErrors.specialty}
          />
          <SubmitButton isLoading={false}>Crear Mi Cuenta →</SubmitButton>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="register-form" noValidate>
          <AvatarPreview src={formData.avatarUrl} />
          <TextareaInput
            id="bio"
            label="Biografía"
            icon={AlignLeft}
            placeholder="Cuéntanos sobre ti..."
            value={formData.bio}
            onChange={updateField("bio")}
          />
          <FormInput
            id="avatarUrl"
            type="url"
            label="Añadir Foto (URL)"
            icon={ImageIcon}
            placeholder="https://..."
            value={formData.avatarUrl}
            onChange={updateField("avatarUrl")}
            error={fieldErrors.avatarUrl}
          />
          <FormInput
            id="username"
            type="text"
            label="Nombre de Usuario"
            icon={AtSign}
            placeholder="alex"
            value={formData.username}
            onChange={updateField("username")}
            error={fieldErrors.username}
            autoComplete="username"
            required
          />
          <FormInput
            id="portfolioUrl"
            type="url"
            label="Url Portafolio"
            icon={LinkIcon}
            placeholder="https://..."
            value={formData.portfolioUrl}
            onChange={updateField("portfolioUrl")}
            error={fieldErrors.portfolioUrl}
          />
          <FormInput
            id="instagramUrl"
            type="url"
            label="Url Redes Sociales"
            icon={LinkIcon}
            placeholder="https://instagram.com/..."
            value={formData.instagramUrl}
            onChange={updateField("instagramUrl")}
            error={fieldErrors.instagramUrl}
          />

          <div className="register-step-actions">
            <button
              type="button"
              className="register-back-button"
              onClick={handleBackStep}
            >
              ← Volver
            </button>
            <SubmitButton isLoading={isLoading} loadingText="Creando cuenta...">
              Completar Registro
            </SubmitButton>
          </div>
        </form>
      )}
    </AuthCard>
  );
};